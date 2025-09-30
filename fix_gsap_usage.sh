#!/bin/bash

# Fix GSAP usage in all files that use the incorrect pattern
find src -name "*.tsx" -type f -exec grep -l "useGSAP(() => {" {} \; | while read file; do
    echo "Fixing GSAP usage in: $file"
    
    # Replace the incorrect pattern with the correct one
    sed -i '' 's/useGSAP(() => {/useGSAP((gsap) => {/g' "$file"
    
    # Remove the require statements for gsap and ScrollTrigger
    sed -i '' '/const gsap = require('\''gsap'\'');/d' "$file"
    sed -i '' '/const ScrollTrigger = require('\''gsap\/ScrollTrigger'\'');/d' "$file"
    
    # Clean up any empty lines that might be left
    sed -i '' '/^[[:space:]]*$/N;/^\n$/d' "$file"
done

echo "GSAP usage fixes completed!"
