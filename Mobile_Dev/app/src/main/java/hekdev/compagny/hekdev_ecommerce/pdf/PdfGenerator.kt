package hekdev.compagny.hekdev_ecommerce.pdf

import android.content.Context
import android.graphics.drawable.Drawable

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Rect

import android.widget.ScrollView

import android.widget.Toast

import android.graphics.pdf.PdfDocument
import android.graphics.pdf.PdfDocument.PageInfo
import android.os.Environment
import android.util.Log
import android.view.View
import java.io.File
import java.io.FileOutputStream
import java.io.OutputStream
import java.lang.Exception

@Suppress("DEPRECATION")
class PdfGenerator(context: Context) {
    private var mFile: File? = null
    private val mContext: Context = context

    fun saveImageToPDF(context: Context,title: View, bitmap: Bitmap) {
        val path: File = Environment.getExternalStoragePublicDirectory(
            Environment.DIRECTORY_DOCUMENTS
        )
        if (!path.exists()) {
            path.mkdirs()
        }
        try {
            mFile = File("$path/", System.currentTimeMillis().toString() + ".pdf")
            if (!mFile!!.exists()) {
                val height = bitmap.height
                val document = PdfDocument()
                val pageInfo = PageInfo.Builder(bitmap.width, height, 1).create()
                val page = document.startPage(pageInfo)
                val canvas: Canvas = page.canvas
                title.draw(canvas)
                canvas.drawBitmap(
                    bitmap,
                    null,
                    Rect(0, bitmap.height, bitmap.width, bitmap.height),
                    null
                )
                document.finishPage(page)
                try {
                    mFile!!.createNewFile()
                    val out: OutputStream = FileOutputStream(mFile)
                    document.writeTo(out)
                    document.close()
                    out.close()
                    Log.e(TAG, "Pdf Saved at:" + mFile!!.absolutePath)
                    Toast.makeText(
                        context,
                        "Pdf Saved at:" + mFile!!.absolutePath,
                        Toast.LENGTH_SHORT
                    ).show()
                } catch (e: Exception) {
                    e.printStackTrace()
                    Toast.makeText(context,"Oops,Something went wrong.",Toast.LENGTH_SHORT).show()
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(context,"Oops,Something went wrong.",Toast.LENGTH_SHORT).show()
        }
    }

    fun getViewScreenShot(view: View): Bitmap {
        view.isDrawingCacheEnabled = true
        view.buildDrawingCache()
        return view.drawingCache
    }

    fun getScrollViewScreenShot(nestedScrollView: ScrollView): Bitmap {
        val totalHeight = nestedScrollView.getChildAt(0).height
        val totalWidth = nestedScrollView.getChildAt(0).width
        return getBitmapFromView(nestedScrollView, totalHeight, totalWidth)
    }

    private fun getBitmapFromView(view: View, totalHeight: Int, totalWidth: Int): Bitmap {
        val returnedBitmap = Bitmap.createBitmap(totalWidth, totalHeight, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(returnedBitmap)
        val bgDrawable: Drawable = view.background
        bgDrawable.draw(canvas)
        view.draw(canvas)
        return returnedBitmap
    }

    companion object {
        private val TAG = PdfGenerator::class.java.simpleName
    }

}