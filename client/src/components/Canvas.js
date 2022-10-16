import React, {useEffect, useRef} from 'react';
import {Fragment, useState} from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { format, parseISO } from "date-fns";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {Stage, Layer, Rect, Transformer, Text, Circle, Star} from 'react-konva';
import Konva from "konva";
import {useDispatch, useSelector} from "react-redux";
import { connect } from 'react-redux';
import {getShapes, updateShapes} from "../actions/shapesActions";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {color: "white", rects: [], circles: [], stars: []};
        this.stageReference = React.createRef();
        this.draggableRectReference = React.createRef();
        this.draggableCircleReference = React.createRef();
        this.draggableStarReference = React.createRef();
    }

    handleClick = () => {

    };

    handleUpdateShapes = () => {
        console.log("State: ", this.state);
        this.props.dispatch(updateShapes(this.state.rects,
                                         this.state.circles,
                                         this.state.stars));
    }

    async componentDidMount() {
        await this.props.dispatch(getShapes());
        this.setState(this.props.state.shapesInfo[0]);
        this.interval = setInterval(async () => {
            await this.props.dispatch(getShapes())
            if(typeof(this.props.state.shapesInfo[0])){
                this.setState(this.props.state.shapesInfo[0]);
            }
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        console.log("Props: ", this.props);
        return (
            <Stage
                width={window.screen.width}
                height={720}
                ref={this.stageReference}
            >
                <Layer>
                    <Rect
                        cornerRadius={15}
                        x={20}
                        y={20}
                        height={680}
                        width={80}
                        fill={"#75533d"}
                        id="ContainerRect"
                    />
                    <Text
                        x={42}
                        y={20}
                        text={'A'}
                        fontVariant={"bold"}
                        fontSize={60}
                        fontFamily={'Calibri'}
                        fill={'white'}
                    />
                    <Rect
                        cornerRadius={15}
                        x={20}
                        y={75}
                        height={2}
                        width={80}
                        fill={"white"}
                        id="ContainerRect"
                    />
                </Layer>
                <Layer>
                    <Rect
                        ref={this.draggableRectReference}
                        x={35}
                        y={95}
                        width={50}
                        height={25}
                        fill={this.state.color}
                        shadowBlur={5}
                        onClick={this.handleClick}
                        draggable={true}
                        onDragMove={(e) => {
                            console.log("Move Event: ", e);
                        }}
                        onDragEnd={(e) => {
                            var draggableRect = this.draggableRectReference.current;
                            this.state.rects.push({
                                _id: "Rectangle_" + (this.state.rects.length + 1).toString(),
                                x: draggableRect.getStage().getPointerPosition().x,
                                y: draggableRect.getStage().getPointerPosition().y,
                                width: 105,
                                height: 45,
                                fill: "white",
                                draggable: true,
                            });
                            draggableRect.position({x: 35, y: 95});
                            this.stageReference.current.draw();
                            this.handleUpdateShapes(e);
                        }}
                    />
                </Layer>
                <Layer>
                    <Circle
                        ref={this.draggableCircleReference}
                        x={58}
                        y={165}
                        radius={70}
                        width={40}
                        height={45}
                        fill={this.state.color}
                        shadowBlur={5}
                        onClick={this.handleClick}
                        draggable={true}
                        onDragEnd={(e) => {
                            var draggableCircle = this.draggableCircleReference.current;
                            this.state.circles.push({
                                _id: "Circle_" + (this.state.circles.length + 1).toString(),
                                x: draggableCircle.getStage().getPointerPosition().x,
                                y: draggableCircle.getStage().getPointerPosition().y,
                                width: 145,
                                radius: 70,
                                height: 75,
                                fill: "white",
                                draggable: true,
                            });
                            console.log("Before Set Stte: ", this.state);
                            draggableCircle.position({x: 58, y: 165});
                            this.stageReference.current.draw();
                            this.handleUpdateShapes(e);
                        }}
                    />
                </Layer>
                <Layer>
                    <Star
                        ref={this.draggableStarReference}
                        x={58}
                        y={245}
                        radius={70}
                        width={40}
                        height={45}
                        fill={this.state.color}
                        shadowBlur={5}
                        onClick={this.handleClick}
                        draggable={true}
                        onDragEnd={(e) => {
                            console.log("Event: ", this.state);
                            var draggableStar = this.draggableStarReference.current;
                            this.state.stars.push({
                                _id: "Star_" + (this.state.stars.length + 1).toString(),
                                x: draggableStar.getStage().getPointerPosition().x,
                                y: draggableStar.getStage().getPointerPosition().y,
                                width: 145,
                                innerRadius: 15,
                                height: 75,
                                fill: "white",
                                draggable: true,
                            });
                            draggableStar.position({x: 58, y: 245});
                            this.stageReference.current.draw();
                            this.handleUpdateShapes(e);
                        }}
                     innerRadius={12}/>
                </Layer>
                <Layer>
                    {typeof(this.state) !== "undefined" && this.state.rects.map(eachRect => {
                        return (
                            <Rect
                                id={eachRect._id}
                                x={eachRect.x}
                                y={eachRect.y}
                                width={eachRect.width}
                                height={eachRect.height}
                                fill={eachRect.fill}
                                onDragMove={(e) => {
                                    for(let i = 0; i < this.state.rects.length; i++){
                                        let rectangle = this.state.rects[i];
                                        if(rectangle._id === e.target.id()){
                                            rectangle.x = e.target.attrs.x;
                                            rectangle.y = e.target.attrs.y;
                                        }
                                    }
                                    console.log("Rectangle Id: ", e.target.id());
                                    console.log("Rectangle Move: ", e.target);
                                    console.log("Rectangle State: ", this.state.rects);
                                }}
                                onDragEnd={(e) => this.handleUpdateShapes()}
                                draggable={eachRect.draggable}
                            />
                        );
                    })}
                </Layer>
                <Layer>
                    {typeof(this.state) !== "undefined" && this.state.circles.map(eachCircle => {
                        return (
                            <Circle
                                id={eachCircle._id}
                                x={eachCircle.x}
                                y={eachCircle.y}
                                radius={70}
                                width={eachCircle.width}
                                height={eachCircle.height}
                                fill={eachCircle.fill}
                                onDragMove={(e) => {
                                    for(let i = 0; i < this.state.circles.length; i++){
                                        let circle = this.state.circles[i];
                                        if(circle._id === e.target.id()){
                                            circle.x = e.target.attrs.x;
                                            circle.y = e.target.attrs.y;
                                        }
                                    }
                                    console.log("Circles Id: ", e.target.id());
                                    console.log("Circles Move: ", e.target);
                                    console.log("Circles State: ", this.state.circles);
                                }}
                                onDragEnd={(e) => this.handleUpdateShapes()}
                                draggable={eachCircle.draggable}
                            />
                        );
                    })}
                </Layer>
                <Layer>
                    {typeof(this.state) !== "undefined" && this.state.stars.map(eachStar => {
                        return (
                            <Star
                                id={eachStar._id}
                                x={eachStar.x}
                                y={eachStar.y}
                                width={eachStar.width}
                                height={eachStar.height}
                                fill={eachStar.fill}
                                onDragMove={(e) => {
                                    for(let i = 0; i < this.state.stars.length; i++){
                                        let star = this.state.stars[i];
                                        if(star._id === e.target.id()){
                                            star.x = e.target.attrs.x;
                                            star.y = e.target.attrs.y;
                                        }
                                    }
                                    console.log("Stars Id: ", e.target.id());
                                    console.log("Stars Move: ", e.target);
                                    console.log("Stars State: ", this.state.stars);
                                }}
                                onDragEnd={(e) => this.handleUpdateShapes()}
                                innerRadius={15}
                                draggable={eachStar.draggable}
                            />
                        );
                    })}
                </Layer>
            </Stage>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.shapesData
    }
}

const mapDispatchToProps = (dispatch) => {
    dispatch(getShapes());
}

export default connect(mapStateToProps)(Canvas);
