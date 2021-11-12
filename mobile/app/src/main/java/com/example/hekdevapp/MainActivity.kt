package com.example.hekdevapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.example.hekdevapp.fragments.AccueilFragment
import com.example.hekdevapp.fragments.ConnexionFragment
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val navView = findViewById<BottomNavigationView>(R.id.navigation_vue)
        navView.setOnNavigationItemSelectedListener{
            when(it.itemId)
            {
                R.id.page_accueil -> {
                    loadFragment(AccueilFragment(this))
                    return@setOnNavigationItemSelectedListener true
                }

                else -> false
            }
        }
        // injection de fragment_page_connexion dans la box



    }
    private fun loadFragment(fragment: Fragment) {

        // val repo = meubleRepository();

        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.fragment_page_connexion_container,fragment)
        transaction.addToBackStack(null)
        transaction.commit()

    }
}