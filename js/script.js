'use strict'

const section2=document.querySelector('.services');
const section1=document.querySelector('.intro h1');
const skills=document.querySelector('.skills');
const projects=document.querySelector('.projects');
const testemonials=document.querySelector('.testemonials');
const contactMe=document.querySelector('.contact-me');
const TypeWriter=function(textElement,words,wait=1000){
    this.textElement=textElement;
    this.words=words;
    this.txt="";
    this.wordIndex=0;
    this.wait=parseInt(wait,10)//make sure that the number passed in is int
    this.type();
    this.isDeleting=false;
}
//Type Method
TypeWriter.prototype.type=function(){
    // Current index of word
    const current=this.wordIndex % this.words.length
    // Get full text of current word
    const fullTxt=this.words[current];
    //Check if deleting
    if(this.isDeleting){
        //remove a character
        this.txt=fullTxt.substring(0,this.txt.length - 1);
    }
    else{
        //add a charachter
        this.txt=fullTxt.substring(0,this.txt.length + 1);
    }
    //Insert txt into element
    this.textElement.textContent=this.txt;
    // Initial Type Speed
    let typeSpeed=200;
    if(this.isDeleting){
        //cut the speed into half
        typeSpeed/=2;
    }
    // If word is complete
    if(!this.isDeleting && this.txt===fullTxt ){
        // Make pause at end
        document.querySelector('.cursor').classList.toggle('cursor-typing');
        typeSpeed=this.wait;
        // Set delete to true
        this.isDeleting=true;
    }
    else if(this.isDeleting && this.txt===''){
        this.isDeleting=false;
        // Move to next word
        this.wordIndex++;
        // Pause before we start typing
        typeSpeed=500;
         
    }
    if(fullTxt ==="Let's have coffee!" && this.txt===fullTxt){
        typeSpeed=5000;
        this.isDeleting=true;
        document.querySelector('.intro-button').style.display='block';
        return;
    }

    setTimeout(()=>this.type(),typeSpeed)
    
}
//run when the DOM load
document.addEventListener('DOMContentLoaded',function(){
    setTimeout(init,2000);
});
// Init App
//Remove the cursor after a while
setTimeout(()=>document.querySelector('.cursor').style.display="none",12000)





function init(){
    const textElement=document.querySelector('.text-type');
    const words=["I am a web developer","Let's have coffee!"]
    new TypeWriter(textElement,words)
}


/*------------------------BackGround change when scrolling---------------*/
const obsCallback=function(entries,observer){
    entries.forEach(entry => {
        const nav= document.querySelector('.bg-dark-light');
        if(entry.target===section1 && entry.isIntersecting && entry.intersectionRatio===1){
           
            
          nav.style.backgroundColor="rgba(0,0,0,0)";
          
          document.querySelectorAll('.nav-link').forEach(el=>el.classList.remove('text-white'));
          document.querySelector('.brand').style.color="black";
          
          return;

        }
       if(entry.isIntersecting){
          
          nav.style.backgroundColor="rgba(0,0,0,0.2)";
          
          document.querySelectorAll('.nav-link').forEach(el=>el.classList.add('text-white'));
          document.querySelector('.brand').style.color="white";
          
       }
       
       
      
        
    });
    
}
const obsOptions={
    root:null,
    threshold:[0.1,1]
}
const observer= new IntersectionObserver(obsCallback,obsOptions);
observer.observe(section2);
observer.observe(section1);
let isClicked=false;
document.querySelector('.navbar button').addEventListener('click',function(e){
    if(isClicked){
        isClicked=false;
        document.querySelector('.bg-dark-light').style.height='10%';
    }
    else{
        isClicked=true;
        document.querySelector('.bg-dark-light').style.height='80%';
        document.querySelector('.bg-dark-light').style.backgroundColor='rgba(0,0,0,0.5)';
        if(!document.querySelector('.nav-link').classList.contains('text-white')){
            document.querySelectorAll('.nav-link').forEach(el=>el.classList.add('text-white'))
        }
    }
    
})
/*------------------------------Display each section-----------------------------------*/
const obsCallbackFun=function(entries,observer){
    entries.forEach(entry=>{
       
        if(entry.isIntersecting){
            entry.target.style.opacity="1";
        }
    })
}
const optionsForObserver={
    root:null,
    threshold:[0.3],
}
const DisplayObserver= new IntersectionObserver(obsCallbackFun,optionsForObserver);
DisplayObserver.observe(section2);
DisplayObserver.observe(skills);
DisplayObserver.observe(projects);
DisplayObserver.observe(testemonials);
DisplayObserver.observe(contactMe);