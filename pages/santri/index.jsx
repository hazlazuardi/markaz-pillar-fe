import React from 'react'
import ShowAllTemplate from '../../component/templates/show_all/ShowAll'
import Layout from "../../component/layout"
import Card from '../../component/modules/Card';
import { useState } from 'react';

export default function data_santri_all() {

    return (
        
            <ShowAllTemplate searchBarName= " Cari Santri" markazOrSantri= "Santri">
            <Card image ="image" name="Itzy" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."/>
            <Card image ="image" name="Red Velvet" desc="Psycho"/>
            <Card image ="image" name="Btob" desc="Beautiful Pain"/>
            <Card image ="image" name="Crush" desc="Beautiful"/>
            <Card image ="image" name="Wendy" desc="Goodbye"/>
            <Card image ="image" name="Imagine Dragons" desc="Bad Liar"/>
            <Card image ="image" name="Imagine Dragons" desc="Believer"/>
            <Card image ="image" name="Twice" desc="Fancy You"/>
            </ShowAllTemplate>
      
    )
}
