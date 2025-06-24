"use client";

import { cn } from "@/lib/utils";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface GameOfLifeGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  updateInterval?: number; // milliseconds between generations
}

export const GameOfLifeGrid: React.FC<GameOfLifeGridProps> = ({
  squareSize = 8,
  gridGap = 2,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  updateInterval = 100,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      canvas.width = canvas.height = 1;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);

  const getNeighborCount = (
    grid: Uint8Array,
    cols: number,
    rows: number,
    x: number,
    y: number
  ): number => {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const nx = (x + dx + cols) % cols;
        const ny = (y + dy + rows) % rows;
        if (grid[nx * rows + ny] === 1) count++;
      }
    }
    return count;
  };

  const evolveGrid = (
    grid: Uint8Array,
    cols: number,
    rows: number
  ): Uint8Array => {
    const newGrid = new Uint8Array(cols * rows);
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const idx = x * rows + y;
        const alive = grid[idx] === 1;
        const neighbors = getNeighborCount(grid, cols, rows, x, y);
        if (alive && (neighbors === 2 || neighbors === 3)) {
          newGrid[idx] = 1;
        } else if (!alive && neighbors === 3) {
          newGrid[idx] = 1;
        } else {
          newGrid[idx] = 0;
        }
      }
    }
    return newGrid;
  };

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    grid: Uint8Array,
    cols: number,
    rows: number,
    dpr: number
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const idx = x * rows + y;
        if (grid[idx] === 1) {
          ctx.fillStyle = `${memoizedColor}1)`;
          ctx.fillRect(
            x * (squareSize + gridGap) * dpr,
            y * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      canvas.width = newWidth * dpr;
      canvas.height = newHeight * dpr;
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
      setCanvasSize({ width: newWidth, height: newHeight });

      const cols = Math.floor(newWidth / (squareSize + gridGap));
      const rows = Math.floor(newHeight / (squareSize + gridGap));
      return { cols, rows };
    };

    let { cols, rows } = updateCanvasSize();
    let grid: Uint8Array = new Uint8Array(cols * rows);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = Math.random() > 0.8 ? 1 : 0;
    }

    let intervalId: number;

    const resizeObserver = new ResizeObserver(() => {
      const size = updateCanvasSize();
      cols = size.cols;
      rows = size.rows;
      grid = new Uint8Array(cols * rows);
      for (let i = 0; i < grid.length; i++) {
        grid[i] = Math.random() > 0.8 ? 1 : 0;
      }
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      intervalId = window.setInterval(() => {
        grid = evolveGrid(grid, cols, rows);
        drawGrid(ctx, grid, cols, rows, dpr);
      }, updateInterval);
    }

    return () => {
      clearInterval(intervalId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [memoizedColor, squareSize, gridGap, width, height, isInView, updateInterval]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};

