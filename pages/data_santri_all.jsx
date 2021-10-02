import React from 'react'
import ShowAllTemplate from '../component/templates/show_all'
import Layout from "../component/layout"
import Card from '../component/modules/Card';
import { useState } from 'react';

export default function data_santri_all() {

    return (
        <Layout>
            <ShowAllTemplate>
            <Card image ="image" santri_name="Itzy" desc="Not Shy"/>
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
