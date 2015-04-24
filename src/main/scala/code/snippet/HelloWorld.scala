package code 
package snippet

import net.liftweb.util.Helpers._
import net.liftweb.common._
import net.liftweb.http.SHtml
import net.liftweb.http.js.JsCmd
import net.liftweb.http.js.JsCmds.SetHtml
import xml.Text

class HelloWorld {
  import BirthGender._

  def render = {

    var name = ""
    var old = false
    var age = 5
    var sex: Box[BirthGender] = Full(BirthGender.NotSpecified)

    val ages = List(1,2,3,4,5,6,7,8,9,10)

    val options : Seq[BirthGender] = BirthGender.values.toSeq

    val radio : SHtml.ChoiceHolder[BirthGender] =
      SHtml.radioElem(options, sex) { selected =>
        sex = selected
      }

    def process() : JsCmd = {
      SetHtml("name", Text(name)) &
      SetHtml("age", Text(age.toString)) &
      SetHtml("sex", Text(sex.getOrElse(BirthGender.NotSpecified).toString)) &
      SetHtml("old", Text(old.toString))
    }

    "@name" #> SHtml.text(name, s => name = s) &
    "@old" #> SHtml.checkbox(old, s => old = s) &
    "@age" #> SHtml.selectElem(ages, Some(age))(age = _) &
    ".options" #> radio.toForm &
    "type=submit" #> SHtml.ajaxSubmit("Click Me", process)
  }

}

object BirthGender extends Enumeration {
  type BirthGender = Value
  val Male = Value("Male")
  val Female = Value("Female")
  val NotSpecified = Value("Rather Not Say")
}