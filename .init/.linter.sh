#!/bin/bash
cd /home/kavia/workspace/code-generation/personal-blog-platform-16601-16693/blog_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

