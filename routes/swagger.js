// Swagger components
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 *     Response200:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - data
 *       properties:
 *         status:
 *           type: bool
 *           description: Status for the getting data
 *         message:
 *           type: string
 *           description: Message for the getting data
 *         data:
 *           type: object
 *           description: Detail of data that has been created
 *       example:
 *         status: true
 *         message: Getting file successfully
 *         data: {
 *             path: "bucket/2020/03/10/10/file.jpg",
 *             fullPath: "uploads/bucket/2020/03/10/10/file.jpg",
 *             fullUrl: "https://localhost:3000/uploads/bucket/2020/03/10/10/file.jpg"
 *         }
 *     Response201:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - data
 *       properties:
 *         status:
 *           type: bool
 *           description: Status for the creating data
 *         message:
 *           type: string
 *           description: Message for the creating data
 *         data:
 *           type: object
 *           description: Detail of data that has been created
 *       example:
 *         status: true
 *         message: Save data successfully
 *         data: {
 *             path: "bucket/2020/03/10/10/file.jpg",
 *             fullPath: "uploads/bucket/2020/03/10/10/file.jpg",
 *             fullUrl: "https://localhost:3000/uploads/bucket/2020/03/10/10/file.jpg"
 *         }
 *     Response404:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - data
 *       properties:
 *         status:
 *           type: bool
 *           description: Status for the request
 *         message:
 *           type: string
 *           description: Message of the error
 *         data:
 *           type: object
 *           description: Detail of data
 *       example:
 *         status: false
 *         message: Not found
 *         data: null
 *     Response500:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - data
 *       properties:
 *         status:
 *           type: bool
 *           description: Status for the request
 *         message:
 *           type: string
 *           description: Message of the error
 *         data:
 *           type: object
 *           description: Detail of data
 *       example:
 *         status: false
 *         message: Internal Server Error
 *         data: null
 */