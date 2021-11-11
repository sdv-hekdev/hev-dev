package com.example.hekdevapp.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.hekdevapp.MainActivity
import com.example.hekdevapp.MeubleAdapter
import com.example.hekdevapp.R

class AccueilFragment(private val context: MainActivity) : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_accueil,container, false)

        val horizontalRecyclerView = view?.findViewById<RecyclerView>(R.id.horizontal_recycler_list)
        horizontalRecyclerView?.adapter = MeubleAdapter()
        horizontalRecyclerView?.layoutManager = LinearLayoutManager(context)

        return view


    }
}