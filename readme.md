# The Long Night

## Structure

- **src**: Contains the source code for the application and also what you are supposed to turn.
  - **components**: Contains reusable components used throughout the app.
    - **GOTComponents**: Contains specific components related to the Game of Thrones theme.
    - **lightBringer.tsx**: A component representing the Lightbringer sword.
  - **constants**: Contains constant values such as colors.
  - **context**: Contains the context.
  - **navigation**: Contains the navigation setup for the app.
  - **screens**: Contains the different screens of the app.
    - **GOTScreens**: Contains specific screens related to the Game of Thrones theme.
    - **battleScreen.tsx**: The screen for the battle scene.
    - **forgeScreen.tsx**: The screen for the forge scene.
    - **winterfellScreen.tsx**: The screen for Winterfell.
  - **services**: Contains services for fetching data from APIs.

## Note

The `GOTScreens` and `GOTComponents` directories contain specific screens and components related to the Game of Thrones theme and are not part of the exam. They are included for thematic purposes.

## Installation

To install the dependencies, run:
```sh
npm install
```
Before starting the project with
```sh
npx expo start 
```

## Troubleshooting

#### Trouble with package versioning
Try and delete the node_modules directory and the package-lock.json, before running:
```sh
npm install
```

#### Too Many Files Open
Often seen on iOS.
Try updating watchman or running:
watchman watch-del-all

### If none of these seem to work check your environment. 
By following the common issues in the Mobile Software Development - Setting Up Your Environment Issues.pdf on itslearning

[LINK]
https://sdu.itslearning.com/ContentArea/ContentArea.aspx?LocationID=35330&LocationType=1&ElementID=1608537

