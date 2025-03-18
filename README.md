```
┌─────────────────────────────────────────────────────────┐
                 _              _               _
                | |            (_)             (_)
   __ _   _ __  | | __   __ _   _   _ __        _    ___
  / _` | | '__| | |/ /  / _` | | | | '_ \      | |  / _ \
 | (_| | | |    |   <  | (_| | | | | | | |  _  | | | (_) |
  \__,_| |_|    |_|\_\  \__,_| |_| |_| |_| (_) |_|  \___/


└─────────────────────────────────────────────────────────┘
```

### 🎨 Portfolio Template Project
- This project allows users to customize the content by adding their own information.
- Additionally, it provides statistics that allow users to track the number of visitors to the site.

### 💻 Installation & Setup
1. Check URL and Port
   1. Move your mouse pointer over the [Preview] → [Running URL and Port] button in the menu bar and click the button.
   2. Check that the domains are registered on the 3000 and 8080 ports.
   3. If not, register the domain.

2. Check Mysql is running
    1. Use command `service mysql start` in the terminal.
    2. Run `ps aux | grep mysql` to check if the mysql service is running.

3. Environment variables and config settings
    1. Navigate to the project's root folder.
    ```sh
    cd path/to/project/root
    ```
    2. Run the `sh/update_user.sh` script.
    ```sh
    sh/update_user.sh
    ```
    3. During the script execution, enter the `user` and `password`.
    ```sh
    Enter SECURITY_USER: your_username
    Enter SECURITY_PASSWORD: your_password
    ```
    * Access the website and log in using the `user` and `password` entered during the script execution.
    * If you want to change the user information, simply re-run the `sh/update_user.sh` script to update the settings.

4. Check Dependencies
   1. If you want to install the required module, enter the following in the terminal
   2. `cd /workspace/portfolio/portfolio/sh` to go to the sh directory.
   3. `./check_dependency.sh` into terminal.

5. Run Project
   1. Click [Run Portfolio] button in the menu bar
   2. Alternatively, You can use the shell command.
   3. Alternatively, go to `cd /workspace/portfolio/portfolio/sh` and run the `sh/run_portfolio.sh` command directly into terminal

6. Customization
    * You have the opportunity to craft your own unique portfolio by customizing the files located within the src folder inside the`front` directory.
    * To customize your portfolio, navigate to the `front/src` directory. Focus on the index.tsx components in the `about`, `contact`, `home`, and `projects` folders within the app directory. Follow the comments in these files to tailor your portfolio to your needs and preferences.

### 📂 Folder Structure
client
```
front
├── node_modules
├── next.config.ts
├── package-lock.json
├── package.json
├── tsconfig.json
├── public
│   └── images
└── src
    ├── app
    │   ├── about
    │   ├── contact
    │   ├── home 
    │   ├── projects
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── CustomLink.tsx
    │   ├── Providers.tsx
    │   ├── charts
    │   │   ├── CustomTooltip.tsx
    │   │   ├── DailyChart.tsx
    │   │   ├── LoadingSpinner.tsx
    │   │   ├── TotalVisitors.tsx
    │   │   └── WeeklyChart.tsx
    │   └── common
    │       ├── ChartNavigation
    │       ├── Footer
    │       ├── Header
    │       └── Navigation
    ├── lib
    │   ├── constant
    │   │   ├── api.ts
    │   │   └── path.ts
    │   ├── generalResponse.ts
    │   └── instance.ts
    ├── pages
    │   ├── api
    │   │   └── get-ip.ts
    │   ├── inquiries.tsx
    │   ├── login.tsx
    │   ├── network-error.tsx
    │   └── statistics.tsx
    ├── shared
    │   ├── auth
    │   ├── contact
    │   ├── socket
    │   └── visitor
    ├── styles
    │   ├── emotion.d.ts
    │   ├── globals.css
    │   ├── page.module.css
    │   └── theme
    │       ├── colors.ts
    │       └── index.ts
    └── types
        └── axios.d.ts.ts
```

server
```
back
├── build.gradle
├── gradlew
├── settings.gradle
├── gradle
│   └── wrapper
└── src
    └── main
          └── java
                └── arkain
                    └── dev
                        └── portfolio
                            └── server
                                ├── auth
                                │   ├── app
                                │   │   └── dto
                                │   ├── domain
                                │   ├── repo
                                │   └── ui
                                ├── common
                                │   ├── dto
                                │   ├── exception
                                │   ├── filter
                                │   └── web
                                │       └── ui
                                ├── config
                                │   ├── security
                                │   │   ├── domain
                                │   │   ├── jwt
                                │   │   └── provider
                                │   ├── socket
                                │   └── web
                                │       └── resolver
                                ├── contact
                                │   ├── app
                                │   │   └── dto
                                │   ├── repo
                                │   │   └── entity
                                │   └── ui
                                └── visitor
                                    ├── app
                                    │   ├── dto
                                    │   └── util
                                    ├── repo
                                    │   └── jpa
                                    │       └── entity
                                    └── ui
```

### 🔧 Tip & Guide

1. **Get URL and Port**
   - You can get the default URL/Port and add URL/Port on the top right.
   - Move your mouse pointer over the [Preview] → [Running URL and Port] button in the menu bar (no click needed).

2. **Command feature**
   - You can simply run your script using the shortcut icons on the top right.
   - Move your mouse pointer over the [Run] → [Add run command] button in the menu bar (no click needed).

3. **SSH Configuration**
   - This feature is only available for membership users.
   - You can SSH to the Arkain container from the outside via the [Menu]->[SSH Configuration] in menu bar.

### 💬 Support & Documentation
Visit [https://arkain.io](https://arkain.io) to support and learn more about using Arkain.
To watch some usage guides, visit [https://docs.arkain.io](https://docs.arkain.io)
