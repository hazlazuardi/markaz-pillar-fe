import React from 'react'
import ShowAllTemplate from '../../component/templates/show_all'
import Layout from "../../component/layout"
import Card from '../../component/modules/Card';
import { useState } from 'react';

export default function data_santri_all() {

    return (
        <Layout>
            <ShowAllTemplate>
            <Card image ="image" santri_name="Itzy" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."/>
            <Card image ="image" santri_name="Red Velvet" desc="Psycho"/>
            <Card image ="image" santri_name="Btob" desc="Beautiful Pain"/>
            <Card image ="image" santri_name="Crush" desc="Beautiful"/>
            <Card image ="image" santri_name="Wendy" desc="Goodbye"/>
            <Card image ="image" santri_name="Imagine Dragons" desc="Bad Liar"/>
            <Card image ="image" santri_name="Imagine Dragons" desc="Believer"/>
            <Card image ="image" santri_name="Twice" desc="Fancy You"/>
            </ShowAllTemplate>
        </Layout>
    )
}
