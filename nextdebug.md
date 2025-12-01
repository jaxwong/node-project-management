
### Setup

1. Download node
2. `npx create-next-app@latest --no-git --typescript`
    - IMPORTANT! If you run without `--no-git` then there will be 2 git initialized(one inside client one outside and youre gonna have problems)
    - DO NOT INSTALL TAILWIND WITH NEXT(DEFAULT SETTING). This will install old tailwind 
3. setup globals.css and tailwind packages
4. 

### Debug

1. Package dependency conflicts are normal and are part of the process
2. To remove the next-app git repo bug, you have to delete the .git folder and git cache inside the next-app
    - `git rm -f client`
    - `ls -Force .gitmodules`
        - `Remove-Item .gitmodules` if file exists
    - `Remove-Item -Recurse -Force .git\modules\client` if folder doesn't exist continue
    - `git rm -f client` (clear cached index folder)
    - `git add .`
    - `git commit -m "remove submodule ref completely`
    - `git push`
    - then create the next app in your root folder(with `--no-git`) and add again




