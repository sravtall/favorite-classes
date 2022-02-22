import "./Class.css"
import React, {useState, useEffect} from 'react';

function ClassGraphQL(props) {

    const [classInfo, setClassInfo] = useState({});

    const url = "https://api.peterportal.org/graphql"
    
    useEffect(() => {
        const fetchData = async () => {
            const query = `
                query {
                    course(id:"${props.name}") {
                        title
                        department_name
                        description
                        instructor_history {
                            name
                        }
                    }
                }
            `
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({query}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data);
            setClassInfo(data.data.course);
        }
        fetchData();
    }, [props.name]);

    let info;
    let instructorInfo;
    if (classInfo && classInfo.instructor_history) {
        instructorInfo = <div className="instructorInfo">
            <p>Possible Instructors: </p>
            {classInfo.instructor_history.map((instructor,index) => {
                if ((classInfo.instructor_history.length - 1)== index) {
                    return <p className="instructor" key={index}>{instructor.name}</p>;
                } else {
                    return <p className="instructor" key={index}>{instructor.name},</p>
                }
                
            })}
        </div>
        
        info = <div className="information">
            <p className="title"> {classInfo.title} </p>
            <p className="department"> {classInfo.department_name} </p>
            <p className="description"> {classInfo.description} </p>
            {instructorInfo}
        </div>
    } else if (classInfo == null) {
        info = <p>Class Not Found</p>
    }
    else {
        info = <p>Loading...</p>
    }

    return (
        <div className="class">
            <p className="className">{props.name}</p>
            <div>
                {info}
            </div>
        </div>
    )
}

export default ClassGraphQL;