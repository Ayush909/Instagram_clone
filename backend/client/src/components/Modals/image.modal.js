import M from 'materialize-css'
import React, { useEffect,useState } from 'react'
import axios from 'axios'

function ImageModal() {

    useEffect(()=>{
        const options = {
          onOpenStart: () => {
            console.log("Open Start");
          },
          onOpenEnd: () => {
            console.log("Open End");
          },
          onCloseStart: () => {
            console.log("Close Start");
          },
          onCloseEnd: () => {
            console.log("Close End");
          },
          inDuration: 250,
          outDuration: 250,
          opacity: 0.5,
          dismissible: false,
          startingTop: "4%",
          endingTop: "10%"
        };
  
         
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
        
  
      },[])

    return (
        <div>
             
            <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

            <div id="modal1" class="modal">
                <div class="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
                </div>
                <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </div>
    )
}

export default ImageModal