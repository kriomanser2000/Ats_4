type IceCreamSize = "small" | "big";
type Topping = "chocolate" | "caramel" | "berry";
interface IceCream 
{
    small: { price: number };
    big: { price: number, toppings: { [key in Topping]: number } };
    marshmallow: { price: number };
}
const icecream: IceCream = 
{
    small: { price: 10 },
    big: { price: 25, toppings: { chocolate: 5, caramel: 6, berry: 10 } },
    marshmallow: { price: 5 }
};
function chooseToppings(): Topping[] 
{
    const availableToppings: Topping[] = ["chocolate", "caramel", "berry"];
    let chosenToppings: Topping[] = [];
    while (chosenToppings.length === 0) 
    {
        const input = prompt(`Ви повинні вибрати одну з начинок. Доступні: ${availableToppings.join(", ")}`);
        if (input === null) 
        {
            alert('Ви повинні вибрати принаймні одну доступну начинку.');
            continue;
        }
        chosenToppings = input.split(',').map(t => t.trim().toLowerCase() as Topping).filter(t => availableToppings.includes(t));
        if (chosenToppings.length === 0) 
        {
            alert('Ви повинні вибрати принаймні одну доступну начинку.');
        }
    }
    return chosenToppings;
}
function buyIceCream() 
{
    const sizeInput = prompt('Виберіть розмір морозива (small/big):');
    if (sizeInput === null) 
    {
        alert('Неправильний розмір. Будь ласка, виберіть small або big.');
        return;
    }
    const size = sizeInput.toLowerCase() as IceCreamSize;
    const isSmallSize = size === "small";
    const isBigSize = size === "big";
    if (!isSmallSize && !isBigSize) 
    {
        alert('Неправильний розмір. Будь ласка, виберіть small або big.');
        return;
    }
    let totalPrice = isSmallSize ? icecream.small.price : icecream.big.price;
    const toppings = chooseToppings();
    if (isBigSize) 
    {
        for (const topping of toppings) 
        {
            totalPrice += icecream.big.toppings[topping];
        }
    }
    const addMarshmallowInput = prompt('Чи хочете ви додати маршмеллоу? (yes/no):');
    if (addMarshmallowInput !== null && addMarshmallowInput.toLowerCase() === 'yes') 
    {
        totalPrice += icecream.marshmallow.price;
    }
    alert(`Загальна вартість вашого морозива: ${totalPrice} грн.`);
}
buyIceCream();