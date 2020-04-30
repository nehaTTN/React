//Q3. Create a markup template using string literal
class Question3
{
  method()
  {
    const song = {
      name: 'Dying to live',
      artist: 'Tupac',
      featuring: 'Biggie Smalls'
    };
    const markup=`
    <div class="song">
    <p>
    ${song.name} — ${song.artist} <br>
    (Featuring ${song.featuring})
    </p>
    </div>
    `;
    document.body.innerHTML = markup;
  }
}
export default Question3;
