
In order to run this project, you can run a local HTTP server, then open your web browser and go to the HTML file index.html 

1. Open your command prompt (Windows)/ terminal (macOS/ Linux). To check Python is installed, enter the following command:

	>> python -V

2. If this is OK, navigate to the directory of this project, using the cd command.

3. Enter the command to start up a server in that directory:

# If Python version returned above is 3.X
	>> python -m http.server 8000
	
# If Python version returned above is 2.X
	>> python -m SimpleHTTPServer 8000

4. Open your web browser and enter the URL localhost:8000/
   Here you'll see the contents of the directory listed — click the HTML file index.html


If it runs well, you can click on "Choose file" button and then choose the maritime dataset "…/Prototype0/Python_script/data.json"