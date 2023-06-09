import { Container, Row, Col, InputGroup} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { AppDispatch, RootState } from "../lib/state_manager/store";
import { NormalTextField } from "../component/textfield/NormalTextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { getPlaceData, postPlaceData, selectPlaceData, getPlaceStatus } from "../lib/state_manager/reducers/placeHolderSlice";

export const Home = () => {
    const dispatch: AppDispatch = useDispatch()
    const placeData = useSelector((state: RootState) => selectPlaceData(state))
    const placeStatus = useSelector((state: RootState) => getPlaceStatus(state))

    // try array
    const [dataArray, setDataArray] = useState<any[]>([]);
    const handleAddData = (value: any) => {
        setDataArray([...dataArray, value]);
    };
    const handleDeleteData = (value: any) => {
        const newData = dataArray.filter((val) => val !== value)
        setDataArray(newData)
    }
    // 

    interface InputField {
        name: string;
    }
    const [inputField, setInputField] = useState<InputField>
    ({
        name: ""
    });


    useEffect(()=>{
        dispatch(getPlaceData())
    },[dispatch])

    useEffect(()=>{
        if(placeStatus === "success add" && placeData){
            dispatch(getPlaceData())
        }
    },[dispatch,placeStatus,placeData])


    return(
        <Container className="mt-4">
            <h1>Try TypeScript</h1>
            <Row 
                className="mt-4 p-2 justify-content-center gap-3" 
                style={{
                    height: 400, 
                    background: "#EEE2DE",
                    flexWrap: "wrap",
                    overflow: "scroll",
                    overflowX: "hidden"
                }}
            >
              {placeStatus === "success" ? placeData?.map((data: any, index: number)=>(
                <Col 
                    lg={"auto"}
                    key={index}
                    style={{padding: 5, backgroundColor: "white"}}
                >
                    <span style={{color: "black"}}>{data.title}</span>
                </Col>
              )) : ""}
            </Row>
            <Row className="mt-4 justify-content-center">
                <Col fluid>
                    <NormalTextField
                        placeholder={"Add new"}
                        input={inputField.name}
                        onChanged={(e: any) : any => {
                            setInputField({
                            ...inputField,
                            name: e.target.value,
                            });
                        }}
                    />
                </Col>
                <Col lg={"auto"}>
                    <FontAwesomeIcon
                        icon={faCirclePlus}
                        style={{width: 30, height: 30, marginTop: 10, cursor: "pointer"}}
                        onClick={() => {
                            // dispatch(postPlaceData({ newData: inputField }));
                            handleAddData(inputField.name)
                        }}
                    />
                </Col>
            </Row>
            <Row className="mt-4 p-3 justify-content-center gap-3" >
                {dataArray.map((val: any, index: number)=> (
                <Col 
                    lg={"auto"}
                    key={index}
                    style={{padding: 5, backgroundColor: "#FFAAC9", borderRadius: 5}}
                >
                    <span style={{color: "black", fontSize: 16, marginRight: 10}}>{val}</span>
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{width: 20, height: 20, marginTop: 4, cursor: "pointer"}}
                        onClick={() => {
                            handleDeleteData(val)
                        }}
                    />
                </Col>
                ))}
            </Row>
        </Container>
    )
}