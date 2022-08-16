# Avent

Avent is an app designed to help interns find events that are relevant to their interests. The app allows users to search for events by keyword and location. Event listings include information about the event, such as the host, location, time, and description. Avent also allows users to RSVP for events and create their own events to share.
![Imgur](https://imgur.com/q9vuhgr)

## Built With

- Node.js
- React
- Express
- PostgresSQL
- Material UI
- AWS SDK
- Enzyme

## Installation

Clone the repo to your local machine and run the following code:

```bash
npm install
```

Next, cd into the avent-app folder and run the frontend using this command.

```bash
npm start
```

For this next step, make sure that PostgresSQL is installed and running on your computer.
You will need to run the command below and press enter twice to create the database tables required for the backend to run.

```bash
psql -f avent.sql
```

After the database is created, cd into the backend folder and run this command

```bash
npm start
```

The app should now be fully functioning with the frontend running on localhost:3000 and the backend on localhost:3001.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

    1. Fork the Project
    2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
    3. Commit your Changes (git commit -m 'Add some AmazingFeature')
    4. Push to the Branch (git push origin feature/AmazingFeature)
    5. Open a Pull Request

## License

Distributed under the license: [MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgements

Here are some resources our team found useful during the creation of this project:

- [Material UI Documentation](https://mui.com/material-ui/getting-started/overview/)
- [React Router Documentation](https://reactrouter.com/docs/en/v6)
- [Javascript Mastery's 1 Hour Material UI Guide](https://www.youtube.com/watch?v=Xoz31I1FuiY)
- Codepath's Labs and Projects
