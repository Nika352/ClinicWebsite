Project Description
Authorization/Registration:

During the registration process, users are required to input a name (at least 5 characters) and a password (at least 8 characters that must contain numbers, symbols, upper/lowercase letters).
An activation email is sent upon registration, and it expires in 30 minutes. If the activation link is accessed after 30 minutes, a "The link has expired" message is displayed.
Successful activation allows users to access their profile page.
Password retrieval involves sending a random code, which needs to be entered within 5 minutes. Upon entering the correct code, users can set a new password.
Two-factor authentication is enabled, where a 4-character code (case sensitive) is sent to the registered email during login. The code is active for 5 minutes, with the option to generate a new code every 1 minute.
User Roles:

Only regular users can register on the site.
Administrators can add, edit, and delete all types of users (administrators, doctors, and users).
Main Page:

The main page features a category selection, a language change button, and a login/sign-up button. After authorization, the login button transforms into a profile button that directs users to their profile.
Doctor profiles display photos, names, surnames, specialties, and evaluations. The top bar showcases "Apine" cards, which stand out from the others.
Administrator:

Administrators can manage all user types.
The side panel offers options to change user details, passwords, and email addresses.
Changing the email requires confirmation of both the old and new email addresses using a verification code.
Menu options in the side panel include registration, categories, and doctors.
Registration:

The registration section features a grid of existing users and a button to add new ones. Users can view user photos (thumbnails), edit, delete, and download resumes.
Choosing to add a new doctor involves category selection, photo upload, and resume upload activation. Thumbnails are generated upon photo upload, and users can provide a brief description of their achievements when registering as a doctor.
Categories:

Admins can add, edit, and delete categories, with checks in place to prevent deletion if the category is assigned to any doctor. Editing a category name updates it for registered doctors.
Doctor's Page:

The doctor's photo and personal information are displayed in the side panel, with options to edit passwords and email.
Technology Stack:

The project employs Ado.net procedures for database interactions.
