import Link from 'next/link'
import classes from'./page.module.css'
import MealsGrid from '../components/main-header/meals/meals-grid'
import { getMeals } from '@/lib/meals'
import { Suspense } from 'react'

async function Meals(){
    const meals = await getMeals(); 
    return <MealsGrid meals={meals}/>
}
export default function MealsPage(){
    
    return <>
    <header className={classes.header}>
        <h1>Delicious meals, created{' '}<span className={classes.highlight}>by you</span></h1>
        <p>
            Choose your favourite recipe and cook it yorself. It is easy and tasty
        </p>
        <p className={classes.cta}>
            <Link href='/meals/share'>
            Share your favourite recipe!
            </Link>
        </p>
    </header>
    <main>
        <Suspense fallback={<p className={classes.loading}> Fetching Data...</p>}>
            <Meals/>
        </Suspense>
    </main>
    </>
}