# test-eel-app
Making a Desktop app with python using [Eel](https://github.com/python-eel/Eel) 

----

Backend App Controller -> `app.py` 

Frontend -> `\web`

### Create a new python venv and install the packages
`pip install -r requirements.txt`

> make sure the created virtual environment is activated.

----

### Changing the UI of the App -
Make the changes in the index.html, style.css and app.js files

----

### Build the App - 

> make sure PyInstaller is installed 

`python -m eel app.py .\web` 

Add option `--onefile` to build in a single executable file.
