const billNum = document.getElementById('myBill');
const tipBtn = document.querySelectorAll('.tip')
const tipCustBtn = document.getElementById('tip-custom');
const pplNum = document.getElementById('input-myppl');
const results = document.querySelectorAll('.output-values');
const resetBtn = document.querySelector('.new');

billNum.addEventListener('input',setMyBill);
tipCustBtn.addEventListener('input',setMyCustomTip);
pplNum.addEventListener('input',setMyPpl);
resetBtn.addEventListener('click',resetFunc);

tipBtn.forEach(button => {
    button.addEventListener('click', isClicked);
});

let billVal = 0;
let tipVal = 0.15;
let customTipVal = 0;
let pplVal = 1;
let tipAmount = 0;

// through reg expression checks if input is a valid float
function isValid(aux)
{
    var exp = /[-+]?[0-9]*\.?[0-9]+/;
    return aux.match(exp);
}

//through reg expression checks if input is a valid int
function isIntValid(aux)
{
    var exp = /\b[0-9]+\b/;
    return aux.match(exp);
}

//function that reflects changes in "bill" user input 
function setMyBill()
{
    //if comma is used in input number then switch to a period
    if(billNum.value.includes(','))
    {
        billNum.value = billNum.value.replace(',','.')
    }

    //if num is negative then returns null and an alert
    if(billNum.value < 0)
    {
        billNum.value = billNum.value.substring(0, billNum.value.length-1);
        alert("Only positive values!");
    }

    //if not a valid float then return null and alert 
    if(!isValid(billNum.value))
    {
        billNum.value = billNum.value.substring(0, billNum.value.length-1);
        alert("invalid input, only numbers!");
    }
    
    // returns the bill num as float
    billVal = parseFloat(billNum.value);
    console.log(billVal);

    //calls calcTip function when bill is inserted
    calcTip();
}

//function that accesses button class list, sets or removes active satus, and sets tip percentage value on-click  
function isClicked(btnActive)
{
    tipBtn.forEach(button => 
    {
        button.classList.remove('my-active');

        if(btnActive.target.innerHTML == button.innerHTML)
        {
            button.classList.add('my-active');
            tipVal = parseFloat(button.innerHTML)/100;
        }

        tipCustBtn.value = '';

        //calls calcTip function when bill is inserted
        calcTip();
    });
    
}

//function that reflects changes in custom tip user input
function setMyCustomTip()

{
    // if less than 0 report error
    if(tipCustBtn.value < 0)
    {
        tipCustBtn.value = tipCustBtn.value.substring(0, tipCustBtn.value.length-1);
        alert("Only positive values!");
    }

    // set tipVal to cutom tip value and divide by 100 to get percentage
    tipVal = parseFloat(tipCustBtn.value/100);

    // if a tip button is clicked then actve status is removed from custom tip
    tipBtn.forEach(button => 
        {
            button.classList.remove('my-active');
        });

    // if tip custom value is not empty then calculate tp with custom tip value
    if(tipCustBtn.value !== '')
    {
        //calls calcTip function when bill is inserted
        calcTip();
    }
}

//function that reflects changes in number of people user input
function setMyPpl()

{
    //if number of people less than zero report error 
    if(pplNum.value <= 0)
    {
        pplNum.value = pplNum.value.substring(0, pplNum.value.length-1);
        alert("Only values above 0!");
    }
    
    //update pplVal with user input of number of people
    pplVal = parseFloat(pplNum.value);
    calcTip();
}

// calcultes tip ammount
function calcTip()
{
    //pplVal always has to be > 1, if it is then calculate tip and total divided by the total # ppl respectively
    if(pplVal >=1)
    {
        let tipAmount = (billVal * tipVal)/pplVal;
        let total = (tipAmount + billVal)/pplVal;

        //update results and reflect them a output in fixed-point notation for aesthetic
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);


    }
}

// resets all values to default
function resetFunc()
{
    //sets bill value back to zero
    billNum.value = 0;
    setMyBill();

    //sets tip button back to default 15 by clicking button position "2"
    tipBtn[2].click();

    // sets ppl num back to default 1
    pplNum.value = '1';
    setMyPpl();
}







