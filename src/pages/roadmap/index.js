// ** MUI Imports
import React, { useState } from 'react';

import Grid from '@mui/material/Grid'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Viewer, Worker } from '@react-pdf-viewer/core';

import { pdfjs } from 'react-pdf';

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'


const renderPage = (props) => {
    return (
        <>
            {props.canvasLayer.children}
            <div style={{ userSelect: 'none' ,display:'none'}}>
                {props.textLayer.children}
            </div> 
        </>
    );
};


const WhitepaperPdf = () => {
   

    return (
        <DatePickerWrapper>
            <Grid container spacing={2} className='match-height' sx={{ m: 5 }}> 
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>

                        <Viewer fileUrl="/roadmap.pdf"
                            renderPage={renderPage}
                            />
                    </Worker> 
            </Grid>
        </DatePickerWrapper>
    )
}

export default WhitepaperPdf
