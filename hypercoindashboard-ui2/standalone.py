import os
import shutil

# Define the source directory (hypercoindashboard-ui2 inside the parent project)
source_dir = r"C:\Projects\hypercoindashboard-ui\hypercoindashboard-ui2"
# Define a clean, top-level directory to treat it as a standalone project
target_dir = r"C:\Projects\hypercoindashboard-ui2-standalone"

# Copy all contents from hypercoindashboard-ui2 to a new standalone directory
if os.path.exists(source_dir):
    shutil.copytree(source_dir, target_dir, dirs_exist_ok=True)

target_dir
