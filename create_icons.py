import matplotlib.pyplot as plt
import numpy as np

def create_placeholder_icon(size, filename, color='#4A90E2'):
    """
    Generates a solid color square icon of a given size.

    Args:
        size (int): The width and height of the icon in pixels.
        filename (str): The name of the file to save the icon as.
        color (str): The hex color code for the icon.
    """
    # Set the figure size in inches, using a DPI of 100
    figsize_in = size / 100.0
    fig = plt.figure(figsize=(figsize_in, figsize_in), dpi=100)

    # Create an axes object that fills the entire figure
    ax = fig.add_axes([0, 0, 1, 1])

    # Turn off the axis lines and labels
    ax.axis('off')

    # Create a simple colored square
    # We set the facecolor of the axes to our desired color
    ax.set_facecolor(color)
    
    # Also set the figure patch color to avoid any white border
    fig.patch.set_facecolor(color)


    # Save the figure. The transparent=True argument can be useful
    # if you want a shape other than a square in the future.
    plt.savefig(filename, dpi=100, transparent=True)
    plt.close(fig)
    print(f"Created icon: {filename}")

# Define the sizes required by the manifest.json
icon_sizes = {
    "icon16.png": 16,
    "icon48.png": 48,
    "icon128.png": 128
}

# Generate each icon
for filename, size in icon_sizes.items():
    create_placeholder_icon(size, filename)

print("\nSuccessfully generated all three icons.")
