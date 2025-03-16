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

        if(!additionalColors.includes(color)) {
            for(const power of ["off", "on"]) pigmentSmeltingRecipes.createRecipe(
                "base:light[power=" + power + ",lightRed=" + color.r + ",lightGreen=" + color.g + ",lightBlue=" + color.b + "]",
                pigmentItem
            );
        }

        colors[color.name] = pigmentItem;
    }

    // Primary colors
    const magenta = mod.createCraftingRecipe("magenta_pigment").createShapeless(colors.magenta, 2);
    magenta.addItem(colors.rose, 1); magenta.addItem(colors.violet, 1);
    
    const yellow = mod.createCraftingRecipe("yellow_pigment").createShapeless(colors.yellow, 2);
    yellow.addItem(colors.lime, 1); yellow.addItem(colors.orange, 1);
    
    const cyan = mod.createCraftingRecipe("cyan_pigment");
    const cyanA = cyan.createShapeless(colors.cyan, 2);
    cyanA.addItem(colors.green, 1); cyanA.addItem(colors.blue, 1);
    const cyanB = cyan.createShapeless(colors.cyan, 2);
    cyanB.addItem(colors.spring_green, 1); cyanB.addItem(colors.azure, 1);

    // Secondary colors
    const red = mod.createCraftingRecipe("red_pigment").createShapeless(colors.red, 2);
    red.addItem(colors.magenta, 1); red.addItem(colors.yellow, 1);
    
    const blue = mod.createCraftingRecipe("blue_pigment").createShapeless(colors.blue, 2);
    blue.addItem(colors.magenta, 1); blue.addItem(colors.cyan, 1);
    
    const green = mod.createCraftingRecipe("green_pigment");
    const greenA = green.createShapeless(colors.green, 2);
    greenA.addItem(colors.yellow, 1); greenA.addItem(colors.cyan, 1);
    const greenB = green.createShapeless(colors.green, 2);
    greenB.addItem(colors.yellow, 1); greenB.addItem(colors.blue, 1);

    // Tertiary colors
    const orange = mod.createCraftingRecipe("orange_pigment").createShapeless(colors.orange, 2);
    orange.addItem(colors.red, 1); orange.addItem(colors.yellow, 1);
    
    const lime = mod.createCraftingRecipe("lime_pigment").createShapeless(colors.lime, 2);
    lime.addItem(colors.yellow, 1); lime.addItem(colors.green, 1);
    
    const spring_green = mod.createCraftingRecipe("spring_green_pigment").createShapeless(colors.spring_green, 2);
    spring_green.addItem(colors.green, 1); spring_green.addItem(colors.cyan, 1);
    
    const azure = mod.createCraftingRecipe("azure_pigment").createShapeless(colors.azure, 2);
    azure.addItem(colors.cyan, 1); azure.addItem(colors.blue, 1);
    
    const violet = mod.createCraftingRecipe("violet_pigment");
    const violetA = violet.createShapeless(colors.violet, 2);
    violetA.addItem(colors.blue, 1); violetA.addItem(colors.magenta, 1);
    const violetB = violet.createShapeless(colors.violet, 2);
    violetB.addItem(colors.blue, 1); violetB.addItem(colors.red, 1);
    
    const rose = mod.createCraftingRecipe("rose_pigment").createShapeless(colors.rose, 2);
    rose.addItem(colors.magenta, 1); rose.addItem(colors.red, 1);

    // Grays
    const gray = mod.createCraftingRecipe("gray_pigment");
    const grayA = gray.createShapeless(colors.gray, 2);
    grayA.addItem(colors.black, 1); grayA.addItem(colors.white, 1);
    const grayB = gray.createShapeless(colors.gray, 2);
    grayB.addItem(colors.dark_gray, 1); grayB.addItem(colors.light_gray, 1);
    
    const darkGray = mod.createCraftingRecipe("dark_gray_pigment");
    const darkGrayA = darkGray.createShapeless(colors.dark_gray, 2);
    darkGrayA.addItem(colors.black, 1); darkGrayA.addItem(colors.gray, 1);
    const darkGrayB = darkGray.createShapeless(colors.dark_gray, 2);
    darkGrayB.addItem(colors.black, 1); darkGrayB.addItem(colors.light_gray, 1);
    
    const lightGray = mod.createCraftingRecipe("light_gray_pigment");
    const lightGrayA = lightGray.createShapeless(colors.light_gray, 2);
    lightGrayA.addItem(colors.white, 1); lightGrayA.addItem(colors.gray, 1);
    const lightGrayB = lightGray.createShapeless(colors.light_gray, 2);
    lightGrayB.addItem(colors.white, 1); lightGrayB.addItem(colors.dark_gray, 1);


    mod.createCraftingRecipe("white_pigment").createShapeless(colors.white, 1).addItem("base:latex", 1);
    mod.createCraftingRecipe("black_pigment").createShapeless(colors.black, 1).addItem("base:rubber_ball", 1);



    const writer = new Writer(mod);
    writer.write("./output/");
}