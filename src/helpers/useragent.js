exports.os = function(req, res, next) {
  switch(true)
    {
    case !!req.headers['user-agent'].match(/Win64/):
         res.downloadLink = "https://downloads.runebase.io/runebase-0.17.5-win64-setup.exe";
         res.downloadName = "runebase-0.17.5-win64-setup.exe";
         break;
    case !!req.headers['user-agent'].match(/Win32/):
         res.downloadLink = "https://downloads.runebase.io/runebase-0.17.5-win32-setup.exe";
         res.downloadName = "runebase-0.17.5-win32-setup.exe";
         break;
    case !!req.headers['user-agent'].match(/iPad/):
         res.downloadLink = "ipad";
         res.downloadName = "ipad";
         break;
    case !!req.headers['user-agent'].match(/iPhone/):
         res.downloadLink = "iphone";
         res.downloadName = "iphone";
         break;
    case !!req.headers['user-agent'].match(/Osx/):
         res.downloadLink = "https://downloads.runebase.io/runebase-0.17.5-osx.dmg";
         res.downloadName = "runebase-0.17.5-osx.dmg";
         break;
    case !!req.headers['user-agent'].match(/Android/):
         res.downloadLink = "https://play.google.com/store/apps/details?id=org.runebase.wallet";
         res.downloadName = "Google Play";
         break;
    case !!req.headers['user-agent'].match(/Linux/):
         res.downloadLink = "https://downloads.runebase.io/runebase-0.17.5-x86_64-linux-gnu.tar.gz";
         res.downloadName = "runebase-0.17.5-x86_64-linux-gnu.tar.gz";
         break;
    default:
         res.downloadLink = "https://downloads.runebase.io/runebase-0.17.5-x86_64-linux-gnu.tar.gz";
         res.downloadName = "runebase-0.17.5-x86_64-linux-gnu.tar.gz";
    }
  next();
}

