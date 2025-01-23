
const inputField = document.querySelector('input');


const buttons = document.querySelectorAll('button');


let currentExpression = "";


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        
        switch (buttonText) {
            case 'RESET':
                
                currentExpression = "";
                inputField.value = "0";
                break;

            case 'Del':
                
                currentExpression = currentExpression.slice(0, -1);
                inputField.value = currentExpression || "0";
                break;

            case '=':
                
                try {
                    currentExpression = eval(currentExpression).toString();
                    inputField.value = currentExpression;
                } catch (error) {
                    inputField.value = "Error";
                }
                break;

            default:
                
                if (currentExpression === "0" || inputField.value === "Error") {
                    currentExpression = ""; 
                }
                currentExpression += buttonText;
                inputField.value = currentExpression;
        }
    });
});
