package com.example.hekdevapp.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.hekdevapp.R

class ConnexionFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater?.inflate(R.layout.fragment_page_connexion,container, false)

         //recuperer le recycler view
        // val horizontalRecyclerView = view.findViewById<RecyclerView>(R.id.horizontal_recycler_view)
       // horizontalRecyclerView.adapter = MeubleAdapter()

    }


}