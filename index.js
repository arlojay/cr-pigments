import { Color, ColorizedTexture, Colors, formatId, Item, LangKeyLanguage, Mod, Writer } from "cosmic-reach-dag";

main();

async function main() {
    const mod = new Mod("pigments");

    const pigmentTexture = await ColorizedTexture.createFromFiles("./textures/pigment-white.png", "./textures/pigment-black.png");

    const pigmentSmeltingRecipes = mod.createFurnaceRecipe("pigment_smelting");
    const colors = {};

    const additionalColors = [ new Color("black", 0, 0, 0), new Color("gray", 7, 7, 7), new Color("dark_gray", 3, 3, 3), new Color("light_gray", 12, 12, 12) ];

    for await(const color of [...Colors.crColors, ...additionalColors]) {
        const pigmentItem = mod.createItem(color + "_pigment");
        pigmentItem.createLangKey().addTranslation(formatId(color.name, true) + " Pigment", LangKeyLanguage.en_us);

        pigmentItem.texture = await pigmentTexture.createTexture(pigmentItem.id.getItem(), color.srgb.r, color.srgb.g, color.srgb.b);
        pigmentItem.tags.push("pigments:pigment");
        pigmentItem.tags.push("pigments:color/" + color);

        if(!additionalColors.includes(color)) {
            for(const power of ["off", "on"]) pigmentSmeltingRecipes.createRecipe(
                "base:light[power=" + power + ",lightRed=" + color.r + ",lightGreen=" + color.g + ",lightBlue=" + color.b + "]",
                pigmentItem
            );
        }

        colors[color.name] = pigmentItem;
    }

    // Primary colors
    mod.createCraftingRecipe("magenta_pigment", colors.magenta, 2)
        .addItem(colors.rose, 1)
        .addItem(colors.violet, 1);
    
    mod.createCraftingRecipe("yellow_pigment", colors.yellow, 2)
        .addItem(colors.lime, 1)
        .addItem(colors.orange, 1);
    
    mod.createCraftingRecipe("cyan_pigment_a", colors.cyan, 2)
        .addItem(colors.green, 1)
        .addItem(colors.blue, 1);
    mod.createCraftingRecipe("cyan_pigment_b", colors.cyan, 2)
        .addItem(colors.spring_green, 1)
        .addItem(colors.azure, 1);

    // Secondary colors
    mod.createCraftingRecipe("red_pigment", colors.red, 2)
        .addItem(colors.magenta, 1)
        .addItem(colors.yellow, 1);
    
    mod.createCraftingRecipe("blue_pigment", colors.blue, 2)
        .addItem(colors.magenta, 1)
        .addItem(colors.cyan, 1);
    
    mod.createCraftingRecipe("green_pigment_a", colors.green, 2)
        .addItem(colors.yellow, 1)
        .addItem(colors.cyan, 1);
    mod.createCraftingRecipe("green_pigment_a", colors.green, 2)
        .addItem(colors.yellow, 1)
        .addItem(colors.blue, 1);

    // Tertiary colors
    mod.createCraftingRecipe("orange_pigment", colors.orange, 2)
        .addItem(colors.red, 1)
        .addItem(colors.yellow, 1);
    
    mod.createCraftingRecipe("lime_pigment", colors.lime, 2)
        .addItem(colors.yellow, 1)
        .addItem(colors.green, 1);
    
    mod.createCraftingRecipe("spring_green_pigment", colors.spring_green, 2)
        .addItem(colors.green, 1)
        .addItem(colors.cyan, 1);
    
    mod.createCraftingRecipe("azure_pigment", colors.azure, 2)
        .addItem(colors.cyan, 1)
        .addItem(colors.blue, 1);
    
    mod.createCraftingRecipe("violet_pigment_a", colors.violet, 2)
        .addItem(colors.blue, 1)
        .addItem(colors.magenta, 1);
    mod.createCraftingRecipe("violet_pigment_b", colors.violet, 2)
        .addItem(colors.blue, 1)
        .addItem(colors.red, 1);
    
    mod.createCraftingRecipe("rose_pigment", colors.rose, 2)
        .addItem(colors.magenta, 1)
        .addItem(colors.red, 1);

    // Grays
    mod.createCraftingRecipe("gray_pigment_a", colors.gray, 2)
        .addItem(colors.black, 1)
        .addItem(colors.white, 1);
    mod.createCraftingRecipe("gray_pigment_a", colors.gray, 2)
        .addItem(colors.dark_gray, 1)
        .addItem(colors.light_gray, 1);
    
    mod.createCraftingRecipe("dark_gray_pigment_a", colors.dark_gray, 2)
        .addItem(colors.black, 1)
        .addItem(colors.gray, 1);
    mod.createCraftingRecipe("dark_gray_pigment_b", colors.dark_gray, 2)
        .addItem(colors.black, 1)
        .addItem(colors.light_gray, 1);
    
    mod.createCraftingRecipe("light_gray_pigment_a", colors.light_gray, 2)
        .addItem(colors.white, 1)
        .addItem(colors.gray, 1);
    mod.createCraftingRecipe("light_gray_pigment_a", colors.light_gray, 2)
        .addItem(colors.white, 1)
        .addItem(colors.dark_gray, 1);


    mod.createCraftingRecipe("white_pigment", colors.white, 1).addItem("base:latex", 1);
    mod.createCraftingRecipe("black_pigment", colors.black, 1).addItem("base:rubber_ball", 1);



    const writer = new Writer(mod);
    writer.write(process.env.LOCALAPPDATA + "/cosmic-reach/mods/");
}