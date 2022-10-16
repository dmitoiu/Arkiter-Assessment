import React, {useEffect, useRef} from 'react';
import {Fragment, useState} from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { format, parseISO } from "date-fns";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {
    ChatBubbleLeftEllipsisIcon,
    CodeBracketIcon,
    EllipsisVerticalIcon,
    EyeIcon,
    FlagIcon,
    HandThumbUpIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    ShareIcon,
    TrashIcon,
    StarIcon,
} from '@heroicons/react/20/solid'
import {
    ArrowTrendingUpIcon,
    Bars3Icon,
    BellIcon,
    FireIcon,
    HomeIcon,
    UserGroupIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import ShareDialog from "../components/ShareDialog";
import logo from "../resources/images/stips-logo.png";
import {useDispatch, useSelector} from "react-redux";
import Helmet from "react-helmet";
import { createRoot } from 'react-dom/client';
import {Stage, Layer, Rect, Transformer, Text, Circle} from 'react-konva';
import Konva from "konva";
import Canvas from "../components/Canvas";

export default function Home() {
    const [openShare, setOpenShare] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    // Create dispatcher
    const dispatch = useDispatch();
    // Get voucher state
    const shapesData = useSelector(state => state.shapesData);
    // Get voucher data
    const {loading, postsInfo} = shapesData;
    const [rects, setRects] = useState({ color: "green", rects: [] });
    const [selectedId, selectShape] = React.useState(null);
    const stageReference = React.createRef();
    const draggableRectReference = React.createRef();

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    const onRectangleClick = (e) => {
        setRects({color: Konva.Util.getRandomColor()})
    }

    useEffect(() => {
        // Load posts data
    }, [])

    return (
        <>
            <Helmet>
                <title>Darie-Dragoș Mitoiu</title>
            </Helmet>
            <div className="min-h-full">
                <Canvas/>
            </div>
        </>
    )
}