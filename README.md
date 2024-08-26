# MoznaPOS Library-Catalog

## Descriptiion

MoznaPOS is a library catalog system built as a React-based web application using the Vite framework, TailwindCSS, Node.js, and Express.js. It streamlines the management of a library's collection, including books, news articles, and papers. All catalog items are stored in a local object and accessed via local storage, supporting Create, Read, Update, and Delete (CRUD) operations efficiently.

## Feature Description

MoznaPOS includes the following features to efficiently manage the library's catalog and customer interactions:

1. **User Roles**: There are two types of users—Owners and Employees. Owners have full access to all system functionalities, while Employees have access to everything except deleting catalogs.

(Only one type of user has been implemented in this project. Due to being new to Firebase, understanding how to create and manage multiple user types was not fully achieved for this project.)

2. **User Authentication**: Both Owners and Employees can log in to their accounts and start creating catalogs for books, news articles, and papers. New items are temporarily stored in the local storage.

3. **Search Functionality**: Users can search the catalog by name, ISBN number, or category, making it easy to find specific items.

4. **Customer Management**: The system features a customer table displaying both existing and new customers. This table helps in managing customers who have borrowed books previously.

5. **Checkout Process**: Users can select a customer during the checkout process to rent books, ensuring accurate record-keeping.

(I created a counter for the system. It's not clear if it should work by selecting a user and specific catalog, but this approach ensures consistent record-keeping.)

6. **CRUD Operations**: Full CRUD (Create, Read, Update, Delete) operations are supported for all catalogs, with local storage updated accordingly for each operation.

7. **Backend API**: A Node.js and Express.js backend is set up to handle all CRUD operations, ensuring smooth communication between the frontend and backend.

8. **API Integration**: Axios is used in the frontend to make API calls, enabling efficient data handling and interaction with the backend.

(Error handling isn't fully implemented for all scenarios, and testing was limited to what was done during implementation, rather than being exhaustive.)

### Created by Muhammad Arsalan Saeed

**Not all of the code was written from scratch, and not all of it is original; I used various resources from forums, YouTube, and other sources.**
