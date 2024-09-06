$(document).ready(()=>{
    $("#buttonHero").on("click",()=>{
        event.preventDefault();
        buscarHeroe();
    });
    $("#heroForm").on("keypress",()=>{
        if(event.key === "Enter"){
            event.preventDefault();
            buscarHeroe();
        }
    });
    const buscarHeroe= ()=>{
        let regex=/^[0-9]+$/;
        let heroID = parseInt($("#heroID").val());
        if(regex.test(heroID)===false){
            $("#heroConfirm").text("valor ingresado es invalido.");
        }else if(0<heroID && heroID<731){
            $("#heroConfirm").text("");
            $(()=>{
                $.ajax({
                  url:`https://www.superheroapi.com/api.php/eed53b6b6f2edcf69873e9c7b4f7127a/${heroID}/`,
                  type:"GET",
                  dataType:"json",
                  success: (heroe)=>{
                    console.log(heroe);
                    //hero card
                    const card = $("<div>").addClass("card mb-3");
                    const fila = $("<div>").addClass("row gap-0");
                    const imagenDiv = $("<div>").addClass("col-md-4");
                    const imagen = $("<img>").attr("src",heroe.image.url).addClass("img-fluid rounded-start");
                    const contenido = $("<div>").addClass("col-md-8");
                    const cardBody = $("<div>").addClass("card-body");
                    const cardTitle = $("<h5>").addClass("card-title").append(`Nombre del heroe: ${heroe.name}<br> Nombre: ${heroe.biography['full-name']}`);
                    const cardText = $("<p>").addClass("card-text");
                    const cardLittleText = $("<small>").addClass("text-body-secondary");
                    
                    cardBody.append(cardTitle);
                    cardBody.append(cardText.append(`Conexiones: ${heroe.connections['group-affiliation']} <br>`));
                    cardBody.append(cardText.append(cardLittleText.append(`Publicado: ${heroe.biography.publisher}<br>
                                                                           Ocupación: ${heroe.work.occupation}<br>
                                                                           Primera Aparición: ${heroe.biography['first-appearance']}<br>
                                                                           Altura: ${heroe.appearance.height[1]}<br>
                                                                           Peso: ${heroe.appearance.weight[1]}<br>
                                                                           Alias: ${heroe.biography.aliases}<br>`)));
                    contenido.append(cardBody);
                    imagenDiv.append(imagen);
                    fila.append(imagenDiv);
                    fila.append(contenido);
                    $("#showHero").html(card.append(fila));
                    //hero stats
                    let chart = new CanvasJS.Chart("showStats", {
                        theme: "light2", // "light1", "light2", "dark1", "dark2"
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: `Estadisticas de poder para ${heroe.name}`
                        },
                        data: [{
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}",
                            dataPoints: [
                                { y: heroe.powerstats.intelligence, label: "Inteligencia" },
                                { y: heroe.powerstats.strength, label: "Fuerza" },
                                { y: heroe.powerstats.speed, label: "Velocidad" },
                                { y: heroe.powerstats.durability, label: "Durabilidad" },
                                { y: heroe.powerstats.power, label: "Poder" },
                                { y: heroe.powerstats.combat, label: "Combate" }
                            ]
                        }]
                    });
                    chart.render();
                },
                });
              });
        }else{
            $("#heroConfirm").text("No se encontro un heroe con ese ID, prueba con un valor entre el 1 y el 730");             
        }; 
    };
});
