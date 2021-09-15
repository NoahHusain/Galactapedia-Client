import React, { useContext, useEffect, useState } from "react";
import "./Wiki.css";
import { useHistory, useParams } from "react-router-dom";
import { WikiContext } from "./WikiProvider";

export const WikiForm = () => {
  const { addStellarObject } = useContext(WikiContext)
  const [stellarObject, setStellarObject] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();



  const checkForm = () => {
    if (
      stellarObject.name === undefined ||
      console.log(stellarObject.name),
      console.log(stellarObject.description),
      console.log(stellarObject.mass),
      console.log(stellarObject.radius),
      console.log(stellarObject.discovered_on),
      console.log(stellarObject.discovered_by),
      stellarObject.description === undefined ||
      stellarObject.mass === undefined ||
      stellarObject.radius === undefined ||
      stellarObject.discovered_on === undefined ||
      stellarObject.discovered_by === undefined
    ){return false}
    else {return true}
  }

  useEffect(() => {
    if (isLoading === false) {
      return
    }
    else {
      handleSavePost()
    }
}, [isLoading])



  const handleSavePost = () => {
      const userId = localStorage.getItem("Galactapedia_user_token")
      if (checkForm() === true) {
        addStellarObject({
          userId: userId,
          name: stellarObject.name,
          description: stellarObject.description,
          mass: stellarObject.mass,
          radius: parseInt(stellarObject.radius),
          discovered_on: stellarObject.discovered_on,
          discovered_by: stellarObject.discovered_by
      })
      .then(() => history.push("/"))
      }  
      else {
        window.alert('Please fill in all form fields before submitting.')
        setIsLoading(false)
      }
    }


  const handleControlledInputChange = (event) => {
    const newWiki = { ...stellarObject }
    newWiki[event.target.name] = event.target.value
    setStellarObject(newWiki)
  }


  return (
      <>
      <h1 className="goldenRodText center">New Wiki</h1>

        <form className="flex post">
        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="name">Name:</label>
            <input value={stellarObject.name} type="name" id="name" name="name" className="center  post blueText" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>
        
        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="description">Description:</label>
            <textarea value={stellarObject.description} type="description" id="description" name="description" className="center  post blueText" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="mass">Mass:</label>
            <input value={stellarObject.mass} type="mass" id="mass" name="mass" className="center  post blueText" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="radius">Radius(Whole Number in Miles):</label>
            <input value={stellarObject.radius} type="radius" id="radius" name="radius" className="center  post blueText" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="discovered_by">Discovered By:</label>
            <input value={stellarObject.discovered_by} type="discovered_by" id="discovered_by" name="discovered_by" className="center  post blueText" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>

        <fieldset>
          <div className="center posts  blueText">
            <label htmlFor="discovered_on">Discovered On (yyyy-mm-dd):</label>
            <input value={stellarObject.discovered_on} type="discovered_on" id="discovered_on" name="discovered_on" className="center  post blueText" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>

        <button className="center post blueText"
          disabled={isLoading}
          onClick={event => {
            setIsLoading(true)
            event.preventDefault() 
          }}>Save Post</button>
      </form>
      </>
    )
}