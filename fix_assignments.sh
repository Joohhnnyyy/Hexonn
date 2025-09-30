#!/bin/bash
for file in /Users/anshjohnson/Desktop/dbms\ v3/Hexon_/src/app/assignment*/page.tsx; do
  echo "Fixing $(basename $(dirname $file))"
  
  # Create a temporary file with the corrected content
  temp_file=$(mktemp)
  
  # Extract the first "use client" and all non-duplicate imports
  echo '"use client";' > "$temp_file"
  echo '' >> "$temp_file"
  
  # Get all unique imports except useGSAP
  grep '^import' "$file" | grep -v 'useGSAP' | sort -u >> "$temp_file"
  
  # Add the useGSAP import once
  echo 'import { useGSAP, pageTransitions } from "@/hooks/useGSAP";' >> "$temp_file"
  echo '' >> "$temp_file"
  
  # Get everything after the imports
  sed -n '/^export default/,$p' "$file" >> "$temp_file"
  
  # Replace the original file
  mv "$temp_file" "$file"
done
