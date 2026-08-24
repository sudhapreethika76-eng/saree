from PIL import Image
import os

public_dir = r"c:\Users\sudha\OneDrive\Desktop\saree\shop\public\images\sarees"
assets_dir = r"c:\Users\sudha\OneDrive\Desktop\saree\shop\src\assets\images"

crops = {
    "saree-01.png": (220, 250, 880, 1130), # Crop pallu & zari border of Midnight Silk
    "saree-02.png": (320, 260, 870, 1080), # Crop floral kadhwa zari border of Burgundy Banarasi
    "saree-03.png": (380, 240, 880, 1040), # Crop solid gold temple border of Ivory Kanchipuram
    "saree-04.png": (400, 250, 880, 1050), # Crop metallic tissue pallu & pleats of Champagne Gold
}

for name, box in crops.items():
    src_path = os.path.join(public_dir, name)
    if os.path.exists(src_path):
        im = Image.open(src_path)
        cropped = im.crop(box)
        # Resize cropped detail back to 896x1200 for crisp high-res display
        resized = cropped.resize((896, 1200), Image.Resampling.LANCZOS)
        
        detail_name = name.replace(".png", "-detail.png")
        
        out_public = os.path.join(public_dir, detail_name)
        out_assets = os.path.join(assets_dir, detail_name)
        
        resized.save(out_public, "PNG")
        resized.save(out_assets, "PNG")
        print(f"Created {detail_name} from {name} with crop box {box}")

print("Saree pallu and border detail images created successfully!")
