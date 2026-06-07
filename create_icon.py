from PIL import Image

# 1. Load the logo
img = Image.open('assets/golds-logo.png').convert("RGBA")

# 2. Get bounding box of non-transparent pixels
bbox = img.getbbox()
if bbox:
    # Crop the image to its bounding box (remove all empty padding)
    img_cropped = img.crop(bbox)
else:
    img_cropped = img

# 3. Create a 512x512 square icon
size = 512
# For a maskable icon, the safe zone is a circle in the center with radius 40% of the size.
# That means the logo should fit within a 409x409 area (512 * 0.8)
safe_size = int(size * 0.8)

# Calculate scaling factor to fit the cropped logo into the safe size
scale = min(safe_size / img_cropped.width, safe_size / img_cropped.height)
new_width = int(img_cropped.width * scale)
new_height = int(img_cropped.height * scale)

# Resize the cropped logo
img_resized = img_cropped.resize((new_width, new_height), Image.Resampling.LANCZOS)

# Create a new 512x512 transparent canvas
icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))

# Paste the resized logo into the center of the canvas
x_offset = (size - new_width) // 2
y_offset = (size - new_height) // 2
icon.paste(img_resized, (x_offset, y_offset))

# Save the resulting icon
icon.save('assets/icon-512x512.png')
print("Successfully created assets/icon-512x512.png")
