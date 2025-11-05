function addtolist(){
    const My_Task = document.getElementById("Task_box").value.trim();
   if (My_Task === "") return;

    const  element_list = document.createElement("li");
    element_list.textContent = My_Task;

    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#10060;";
    deleteBtn.classList.add("delete-btn");

      deleteBtn.addEventListener("click", function() {
        element_list.remove();
            })
        
     element_list.appendChild(deleteBtn);        


    document.getElementById("To_Do_List").appendChild(element_list);
    document.getElementById("Task_box").value = "";
}



document.getElementById("add_btn").addEventListener('click', addtolist)