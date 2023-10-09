Application CertificateApp is written using React framework with TypeScript. Local storage was used for storing data.

Running the application steps:

1. npm install
2. npm start

Visually, the application contains three elements: header, side menu and the main part of the application.

The header is shown on the top of the screen and it is implemented in Header.tsx. In the header you can change the language of the application and also the user. Both menus were implemented using Select component from the MUI library. For the information on the current language and user to be visible to the entire application, React context was used. For the translation, react-i18n library was also used.

The side menu contains the navigation menu and it is implemented in SideMenu.tsx, navigation was implemented using the react-router-dom library. The menu options can also be a dropdown menu with even more options for navigation.

The main part of the application can show different things:

1. Test screens: Start, Example 2 and Example 3 which demonstrate the functionalities of the navigation menu.

2. Screen Example 1 displays the currently stored certificates from local storage. The table for display was implemented using MUI Table component. Clicking on the button New Certificate gives the user the option to add another certificate after which the updated table will be displayed.

2.1 Adding a new certificate was implemented in the component NewCertificate.tsx, the same component is used for editing an already existing certificate, with the initial information already displayed from local storage.

2.1.1 Adding or changing a supplier is implemented through the component SupplierDialog.tsx which is opened after clicking the search icon. The dialog is used to filter and select a supplier, filtering can be done based on different fields, and selection is implemented via a radio button.

2.1.2 Choosing the certificate type is implemented with a selection menu.

2.1.3 Valid from and valid to dates are selected via a input type date component.

2.1.4 Apart from those necessary fields the user has a few more options:

2.1.4.1 Participants can be added to the certificate via the add participant button which opens a dialog implemented in UserDialog.tsx, where the user can filter and select any amount of participants by clicking on their respective checkbox.

2.1.4.2 A comment can be added via the New comment button which will display with its content and name of the user that made it.

2.1.4.3 A file can be uploaded to the certificate after which the user can preview it, link to the file is stored as an element of the certificate in local storage.

2.2 In the certificate overview table, next to every certificate there is a gear button which opens a menu with the options to either edit or delete the certificate which are both immediately shown in the table.
