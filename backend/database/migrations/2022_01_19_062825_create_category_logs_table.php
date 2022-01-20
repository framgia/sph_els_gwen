<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoryLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('category_logs', function (Blueprint $table) {
          $table->id();
            $table->foreignId('user_id')
              ->references('id')
              ->on('users')
              ->onDelete('cascade');
          $table->foreignId('category_id')
            ->references('id')
            ->on('categories')
            ->onDelete('cascade');
          $table->foreignId('word_id')
            ->references('id')
            ->on('words')
            ->onDelete('cascade');
          $table->foreignId('choice_id')
            ->references('id')
            ->on('choices')
            ->onDelete('cascade');
          $table->boolean('is_correct');            
          $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category_logs');
    }
}
