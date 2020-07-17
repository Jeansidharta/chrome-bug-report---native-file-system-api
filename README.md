# What is this?

This repository reproduces a bug in Chrome's Native File System API, found on version 83.0.4103.116, 64 bits, on Windows 10.

# What is the bug?

When reading files from a directory, if the reference to the directory is garbage collected, all attempts to read the contents of files that were previously read from the directory will fail with the message "A requested file or directory could not be found at the time an operation was processed."

# How to reproduce?

Clone this repository and open the `index.html` in a chrome browser, then click the `Open` button on the page and select any folder within your file system that has more than one file in it. After 15 seconds, the following (unexpected) error message should be displayed on the console:

```
Uncaught (in promise) DOMException: A requested file or directory could not be found at the time an operation was processed.
```