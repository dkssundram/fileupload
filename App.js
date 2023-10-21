var http = require('http');
var url =require('url');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/fileupload') {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (err) {
                console.error('Error parsing the form:', err);
                return;
            }

            var uploadedFile = files.filetoupload[0];
            var oldpath = uploadedFile.filepath;
            var newpath = 'C:/Users/dkssu/OneDrive/Desktop/TestPortal/UploadedFiles/' + uploadedFile.originalFilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    console.error('Error renaming the file:', err);
                    return;
                }

                res.write('File Uploaded and Submitted Successfully');
                res.end();
            });
        });
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1><center>File Submission Portal</center></h1>')
        res.write('<center><div id="box">');
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"<br>');
        res.write('<input type="submit">');
        res.write('</form>');
        res.write('</div></center>');
        return res.end();
    }
}).listen(8080);