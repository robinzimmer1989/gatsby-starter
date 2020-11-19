import React from "react"
import Parser from "html-react-parser"

// Fix for fieldset not able to display flex
export default function ObjectFieldTemplate(props) {
  const { TitleField, DescriptionField, hideTitle } = props

  return (
    <fieldset id={props.idSchema.$id}>
      {!hideTitle && (props.uiSchema["ui:title"] || props.title) && (
        <TitleField
          id={`${props.idSchema.$id}__title`}
          title={Parser(props.title || props.uiSchema["ui:title"])}
          required={props.required}
          formContext={props.formContext}
        />
      )}
      <div className="form-inner">
        {props.description && (
          <DescriptionField
            id={`${props.idSchema.$id}__description`}
            description={props.description}
            formContext={props.formContext}
          />
        )}
        {props.properties.map(prop => prop.content)}
      </div>
    </fieldset>
  )
}
