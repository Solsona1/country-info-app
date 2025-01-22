# Country Info App
 <sub>Notice: This project was originally developed during an interview process, and later polished.</sub>  
 
The home page displays a list of countries fetched from an external API. If a country is clicked on, then some information about it (border countries, flag and population) is shown; also fetched from an external API. Since the data is not saved on a database, the back-end purpose is to reorginize the information fetched and deliver it more refined.

## External APIs used
- [Countries Now](https://countriesnow.space/)
- [nager.date](https://date.nager.at/)

## Development stack
The app has a back-end built with NestJs and programmed in Typescript and a front-end built with React and written in Javascript, HTML and css.  

Some of the libraries utilized on the front-end are:
- [Sass Style Sheets](https://sass-lang.com/)
- [Google Charts](https://www.react-google-charts.com/)
- [React Router Dom](https://reactrouter.com/)

Some of the libraries utilized on the back-end are:
- [Class Transformer](https://github.com/typestack/class-transformer)
- [Class Validator](https://github.com/typestack/class-validator)
- [Joi](https://www.npmjs.com/package/nestjs-joi)

## Set up for running in development
Before running the app, perform _npm install_ in both folders: /BE and /front-end to install the required node packages.

### Front-end
To run front-end in development use the command _npm run dev_. Front end runs on local host on port of election, which should be set in an .env file with the variable name **VITE_BASE_API_URL**.

### Back-end
To run back-end in development use the command _npm run start_. Back ends runs on local host on port of election, which should be set in an .env file with the variable name **APP_PORT**. Also, add to the file the variable **NODE_ENV**=development to set the node enviroment to development.
