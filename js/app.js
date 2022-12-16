window.onload=function(){
    // Declare init HTML elements
    const camera = document.querySelector('#camera');
    const photo = document.querySelector('#photo');
    const open = document.querySelector('#open');

    // Event to active input type file
    open.addEventListener('click', function () {
        camera.click();
    });

    // Event on change content type file
    camera.addEventListener('change', function (e) {
        // Create url object and show Photo from BLOB Object.
        photo.src = URL.createObjectURL(e.target.files[0]);
    })
}

    async function validate() {
        //Elements
        const origin = document.getElementById('money-o').value;
        const convert = document.getElementById('money-c').value;
        const coinTo = document.getElementById('coinTo').value;

        //Validate not equals select
        if (origin != convert) {

            const originF = valueFormat(origin);
            const convertF = valueFormat(convert);

            if (originF != 'ERROR' && convertF != 'ERROR') {

                //validate coin null
                if(coinTo>0){

                    //Credenciales
                    var credentials = btoa("utng995364887:l30nf0qa1hfcdgvl4dlt2sf703");

                    //URL
                    const url = `https://xecdapi.xe.com/v1/convert_to.json/?to=${originF}&from=${convertF}&amount=${coinTo}`;

                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", url);

                    //Auth
                    xhr.setRequestHeader("Authorization", `Basic ${credentials}`);
                    let jsonRes;
                    xhr.onreadystatechange = async function () {
                        if (xhr.readyState === 4) {
                            jsonRes = await JSON.parse(xhr.responseText);
                            console.log(jsonRes);
                            document.getElementById('coinFrom').value = jsonRes.from[0].mid;
                        }
                    };

                    xhr.send();
                }else{
                    alert("No hay cantidad");
                }

            } else {
                alert("Uso inadecuado");
            }

        } else {
            alert("Conversion inecesaria");
        }
    }

    function valueFormat(value) {
        switch (value) {
            case '1':
                return 'MXN';
                break;
            case '2':
                return 'EUR';
                break;
            case '3':
                return 'GBP';
                break;
            case '4':
                return 'USD';
                break;
            default:
                return 'ERROR';
        }
    }