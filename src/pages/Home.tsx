import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { NormalTextField } from "../component/textfield/NormalTextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {
  getPlaceData,
  selectPlaceData,
  getPlaceStatus,
} from "../lib/state_manager/reducers/placeHolderSlice";
import { usePlaceDispatch, usePlaceSelector } from "../lib/state_manager/hook";

export const Home = () => {
  const dispatch = usePlaceDispatch();
  const placeData = usePlaceSelector(selectPlaceData);
  const placeStatus = usePlaceSelector(getPlaceStatus);

  type DataApi = {
    body: string;
    title: string;
    id: number;
  };

  const [listData, setListData] = useState<DataApi[]>([]);

  const [dataArray, setDataArray] = useState<string[]>([]);
  const handleAddData = (value: string) => {
    setDataArray([...dataArray, value]);
  };

  const handleDeleteData = (value: string) => {
    const newData = dataArray.filter((val) => val !== value);
    setDataArray(newData);
  };
  //

  const [inputField, setInputField] = useState({
    name: "",
  });

  useEffect(() => {
    dispatch(getPlaceData());
  }, [dispatch]);

  useEffect(() => {
    if (placeStatus === "success") {
      setListData(placeData as DataApi[]);
    }
  }, [placeData, placeStatus]);

  const [isError, setIsError] = useState<string>("");

  useEffect(() => {
    if (placeStatus === "success") {
      if (typeof placeData === "string") {
        setIsError(placeData);
      }
    }
  }, [placeStatus, placeData]);

  return (
    <Container className="mt-4">
      <h1>Try TypeScript</h1>
      <Row
        className="mt-4 p-2 justify-content-center gap-3"
        style={{
          height: 400,
          background: "#EEE2DE",
          flexWrap: "wrap",
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        {Array.isArray(listData) ? (
          listData.map((data) => (
            <Col
              lg={"auto"}
              key={data.id}
              style={{ padding: 5, backgroundColor: "white" }}
            >
              <span style={{ color: "black" }}>{data.title}</span>
            </Col>
          ))
        ) : (
          <h2>{isError}</h2>
        )}
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col>
          <NormalTextField
            type="text"
            placeholder={"Add new"}
            value={inputField.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputField({
                ...inputField,
                name: e.target.value,
              });
            }}
          >
            <FontAwesomeIcon
              icon={faCirclePlus}
              style={{
                width: 30,
                height: 30,
                cursor: "pointer",
              }}
              onClick={() => {
                handleAddData(inputField.name);
              }}
            />
          </NormalTextField>
        </Col>
      </Row>
      <Row className="mt-4 p-3 justify-content-center gap-3">
        {dataArray.map((val, index: number) => (
          <Col
            lg={"auto"}
            key={index}
            style={{ padding: 5, backgroundColor: "#FFAAC9", borderRadius: 5 }}
          >
            <span style={{ color: "black", fontSize: 16, marginRight: 10 }}>
              {val}
            </span>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ width: 20, height: 20, marginTop: 4, cursor: "pointer" }}
              onClick={() => {
                handleDeleteData(val);
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
