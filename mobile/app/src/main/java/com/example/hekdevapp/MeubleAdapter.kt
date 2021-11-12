package com.example.hekdevapp

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView

class MeubleAdapter : RecyclerView.Adapter<MeubleAdapter.ViewHolder>() {

    // Boîte pour ranger tout les composants (  images ) à controler
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        // image du meuble
        val meubleImage = view.findViewById<ImageView>(R.id.image_item)


    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_horizontal_meuble, parent , false)

        return ViewHolder(view)

        // holder.itemView.setonClickListener {
        //          meublePopup(this).show
        //        }
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {}

    override fun getItemCount(): Int = 5
}