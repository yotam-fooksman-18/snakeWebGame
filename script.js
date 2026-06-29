
function inputU(){
    let userInput = prompt("enter number ");
        if ((userInput*userInput) % 2 ==0){
            document.writeln("<div class =header>" + userInput*userInput+"</div>");
        }
    alert("Done");
}
function inputU2(){
    let userInput = prompt("enter number ");
       let x = Math.sqrt(userInput)
            document.writeln("<div class =header>" + x+"</div>");

    alert("Done");
}
inputU()
